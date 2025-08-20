import requests

BASE_URL = "http://127.0.0.1:8000"  # change if testing deployed version
token = None
user = None

# ==========================
# Helper Functions
# ==========================
def register_user():
    print("\n=== Register User ===")
    name = input("Name: ")
    username = input("Username: ")
    email = input("Email: ")
    password = input("Password: ")

    url = f"{BASE_URL}/api/users/register/"
    data = {"name": name, "username": username, "email": email, "password": password}
    r = requests.post(url, json=data)
    print("[REGISTER]", r.status_code, r.json())


def login_user():
    global token, user
    print("\n=== Login User ===")
    email = input("Email: ")
    password = input("Password: ")

    url = f"{BASE_URL}/api/users/login/"
    data = {"email": email, "password": password}
    r = requests.post(url, json=data)
    print("[LOGIN]", r.status_code, r.json())

    if r.status_code == 200:
        token = r.json().get("access")
        user = r.json().get("user")
        print("✅ Logged in successfully!")
    else:
        print("❌ Login failed.")


def create_gig():
    if not token:
        print("❌ You must login first.")
        return

    print("\n=== Create Gig ===")
    title = input("Title: ")
    description = input("Description: ")
    amount = input("Amount: ")

    url = f"{BASE_URL}/gigs/"
    headers = {"Authorization": f"Bearer {token}"}
    data = {"title": title, "description": description, "amount": amount}
    r = requests.post(url, headers=headers, json=data)
    print("[CREATE GIG]", r.status_code, r.json())


def list_gigs():
    print("\n=== List Gigs ===")
    url = f"{BASE_URL}/gigs/"
    r = requests.get(url)
    print("[LIST GIGS]", r.status_code)
    gigs = r.json()
    for g in gigs:
        print(f"ID: {g['id']} | {g['title']} | ${g['amount']} | By {g['created_by_name']}")
    return gigs


def gig_detail():
    gig_id = input("Enter gig ID: ")
    url = f"{BASE_URL}/gigs/{gig_id}/"
    r = requests.get(url)
    print("[GIG DETAIL]", r.status_code, r.json())


def update_gig():
    if not token:
        print("❌ You must login first.")
        return

    gig_id = input("Enter gig ID to update: ")
    title = input("New Title: ")
    description = input("New Description: ")
    amount = input("New Amount: ")

    url = f"{BASE_URL}/gigs/{gig_id}/"
    headers = {"Authorization": f"Bearer {token}"}
    data = {"title": title, "description": description, "amount": amount}
    r = requests.put(url, headers=headers, json=data)
    print("[UPDATE GIG]", r.status_code, r.json())


def delete_gig():
    if not token:
        print("❌ You must login first.")
        return

    gig_id = input("Enter gig ID to delete: ")
    url = f"{BASE_URL}/gigs/{gig_id}/"
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.delete(url, headers=headers)
    print("[DELETE GIG]", r.status_code, r.text)


# ==========================
# Menu
# ==========================
def menu():
    while True:
        print("\n=== GigX CLI Menu ===")
        print("1. Register User")
        print("2. Login User")
        print("3. Create Gig")
        print("4. List Gigs")
        print("5. Gig Detail")
        print("6. Update Gig")
        print("7. Delete Gig")
        print("0. Exit")

        choice = input("Choose an option: ")

        if choice == "1":
            register_user()
        elif choice == "2":
            login_user()
        elif choice == "3":
            create_gig()
        elif choice == "4":
            list_gigs()
        elif choice == "5":
            gig_detail()
        elif choice == "6":
            update_gig()
        elif choice == "7":
            delete_gig()
        elif choice == "0":
            print("👋 Goodbye!")
            break
        else:
            print("❌ Invalid choice.")


if __name__ == "__main__":
    menu()
