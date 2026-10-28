from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import psycopg2.extras
from datetime import datetime
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).with_name(".env.backend"))
app = Flask(__name__)
allowed_origins = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
CORS(app, resources={r"/*": {"origins": [origin.strip() for origin in allowed_origins.split(",") if origin.strip()]}})

# -----------------------------------------
# DATABASE CONNECTION
# -----------------------------------------


def get_db_connection():
    """Connect using environment variables; never hardcode database credentials."""
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME", "canteen"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", ""),
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432"),
        sslmode=os.getenv("DB_SSLMODE", "prefer"),
    )

# -----------------------------------------
# CART ROUTES
# -----------------------------------------

@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    name = data.get('name')
    price = data.get('price')
    quantity = data.get('quantity')

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO cart (name, price, quantity) VALUES (%s, %s, %s)",
            (name, price, quantity)
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({'message': 'Item added to cart'}), 201
    except Exception as e:
        print("Error adding to cart:", e)
        return jsonify({'error': 'Failed to add to cart'}), 500

@app.route('/cart', methods=['GET'])
def get_cart():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT name, price, quantity FROM cart")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        cart = [{'name': r[0], 'price': r[1], 'quantity': r[2]} for r in rows]
        return jsonify(cart), 200
    except Exception as e:
        print("Error fetching cart:", e)
        return jsonify({'error': 'Failed to fetch cart'}), 500

# -----------------------------------------
# ORDER ROUTE
# -----------------------------------------

@app.route('/order', methods=['POST'])
def place_order():
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Debug: Show what’s in cart
        cur.execute("SELECT * FROM cart")
        cart_items = cur.fetchall()
        print("Cart items:", cart_items)

        if not cart_items:
            return jsonify({'error': 'Cart is empty'}), 400

        # Place order
        cur.execute("""
            INSERT INTO orders (name, price, quantity, order_time)
            SELECT name, price, quantity, CURRENT_TIMESTAMP FROM cart
        """)
        cur.execute("DELETE FROM cart")
        conn.commit()

        cur.close()
        conn.close()

        return jsonify({'message': 'Order placed and saved'}), 200
    except Exception as e:
        print("Error placing order:", e)  # 🔴 Copy this error message
        return jsonify({'error': str(e)}), 500


# -----------------------------------------
# CUSTOMER ROUTES
# -----------------------------------------

@app.route('/api/customers', methods=['GET'])
def get_customers():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, name, email, phone, gender, location FROM customers")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        customers = [
            {
                'id': row[0],
                'name': row[1],
                'email': row[2],
                'phone': row[3],
                'gender': row[4],
                'location': row[5]
            }
            for row in rows
        ]
        return jsonify(customers), 200
    except Exception as e:
        print("Error fetching customers:", e)
        return jsonify({'error': 'Failed to fetch customers'}), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, name, price, quantity, order_time FROM orders")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        orders = [
            {
                'id': row[0],
                'name': row[1],
                'price': float(row[2]),
                'quantity': row[3],
                'order_time': row[4].isoformat()
            }
            for row in rows
        ]
        return jsonify(orders), 200
    except Exception as e:
        print("Error fetching orders:", e)
        return jsonify({'error': 'Failed to fetch orders'}), 500

@app.route('/api/customers', methods=['POST'])
def add_customer():
    conn = None
    cur = None
    try:
        data = request.get_json(silent=True)
        if not isinstance(data, dict):
            return jsonify({
                'error': 'Request body must be valid JSON object',
                'missing_fields': ['name', 'email', 'phone', 'gender', 'location']
            }), 400

        required_fields = ['name', 'email', 'phone', 'gender', 'location']
        missing_fields = [
            field for field in required_fields
            if data.get(field) is None or not str(data.get(field)).strip()
        ]
        if missing_fields:
            return jsonify({
                'error': 'Missing required fields',
                'missing_fields': missing_fields
            }), 400

        name = str(data['name']).strip()
        email = str(data['email']).strip()
        phone = str(data['phone']).strip()
        gender = str(data['gender']).strip()
        location = str(data['location']).strip()

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO customers (name, email, phone, gender, location, created_at)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (name, email, phone, gender, location, datetime.now()))
        conn.commit()

        return jsonify({'message': 'Customer added successfully'}), 201

    except Exception as e:
        if conn is not None:
            conn.rollback()
        print("Error adding customer:", e)
        return jsonify({'error': 'Failed to add customer. Check the Flask terminal for details.'}), 500
    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()
    

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    try:
        data = request.get_json()
        feedback_text = data.get('feedback')

        if not feedback_text:
            return jsonify({'error': 'Feedback is required'}), 400

        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO feedback (feedback, submitted_at)
            VALUES (%s, %s)
        """, (feedback_text, datetime.now()))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'message': 'Feedback submitted successfully'}), 200

    except Exception as e:
        print("Error submitting feedback:", e)
        return jsonify({'error': 'Failed to submit feedback'}), 500
    
@app.route('/api/feedback', methods=['GET'])
def get_feedback():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, feedback, submitted_at FROM feedback ORDER BY submitted_at DESC")
        rows = cur.fetchall()
        cur.close()
        conn.close()

        feedback_data = [
            {
                'id': row[0],
                'feedback': row[1],
                'submitted_at': row[2].isoformat() if row[2] else None
            }
            for row in rows
        ]
        return jsonify(feedback_data), 200
    except Exception as e:
        print("Error fetching feedback:", e)
        return jsonify({'error': 'Failed to fetch feedback'}), 500


@app.route('/api/total-revenue', methods=['GET'])
def get_total_revenue():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT SUM(price) FROM orders;")  # Adjust table/column name as needed
        result = cur.fetchone()
        cur.close()
        conn.close()

        total_revenue = result[0] if result[0] is not None else 0.0
        return jsonify({'total_revenue': total_revenue}), 200

    except Exception as e:
        print("Error fetching total revenue:", e)
        return jsonify({'error': 'Failed to fetch total revenue'}), 500



# -----------------------------------------
# ANALYTICS ROUTES
@app.route('/api/analytics/category-sales', methods=['GET'])
def category_sales():
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        query = """
            SELECT f.category, SUM(o.quantity) AS total_sales
            FROM orders o
            JOIN food f ON LOWER(o.name) = LOWER(f.name)
            GROUP BY f.category
            ORDER BY total_sales DESC
        """
        cur.execute(query)
        rows = cur.fetchall()

        cur.close()
        conn.close()

        result = [{'category': row[0], 'total_sales': int(row[1])} for row in rows]

        return jsonify(result), 200

    except Exception as e:
        print("Error fetching category sales:", e)
        return jsonify({'error': 'Failed to fetch category sales'}), 500




@app.route('/api/analytics/gender', methods=['GET'])
def gender_distribution():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT gender, COUNT(*) FROM customers GROUP BY gender")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        result = [{'gender': row[0], 'count': row[1]} for row in rows]
        return jsonify(result), 200
    except Exception as e:
        print("Error fetching gender data:", e)
        return jsonify({'error': 'Failed to fetch gender distribution'}), 500

@app.route('/api/customers/location-count', methods=['GET'])
def get_customer_location_count():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT location, COUNT(*) FROM customers GROUP BY location")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        result = [{'location': row[0], 'count': row[1]} for row in rows]
        return jsonify(result), 200
    except Exception as e:
        print("Error fetching location data:", e)
        return jsonify({'error': 'Failed to fetch location data'}), 500


@app.route('/api/analytics/sales-daily', methods=['GET'])
def daily_sales():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT name, SUM(quantity) 
            FROM orders 
            WHERE DATE(order_time) = CURRENT_DATE 
            GROUP BY name
        """)
        rows = cur.fetchall()
        cur.close()
        conn.close()
        result = [{'item': row[0], 'count': row[1]} for row in rows]
        return jsonify(result), 200
    except Exception as e:
        print("Error fetching sales data:", e)
        return jsonify({'error': 'Failed to fetch daily sales'}), 500

# -----------------------------------------
# MAIN
# -----------------------------------------

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=os.getenv("FLASK_DEBUG", "false").lower() == "true")
