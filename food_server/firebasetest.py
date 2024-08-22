import firebase_admin
from firebase_admin import credentials, storage

# Đường dẫn đến tệp JSON của bạn hoặc sử dụng biến cấu hình trực tiếp
service_account_info = {
  "type": "service_account",
  "project_id": "food-rec-6b763",
  "private_key_id": "4ffe1358d5f594038842a82a51a32459fd3f7d56",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEG27yYRQHgZ8m\ndRBPd+zpWvRnlD47YPDLGOrhFHjKSxnR8JHTzZe80jxBTojjO/3b/hd4nImNVBgF\nn48hCb9FV544ushcTiKdeBqE2XL7UR4f/zku+9Z3Ha31ZFdbDIoV0oSsqM7g6zVW\nwaUKXkyD19Wqh6IybeArKI+8lJIuJZ1LbxrVe8C0d2lAPJaxErgbW9rGY/ohbE6b\n6QBLi4+iJMf+/S89fLWfbDUVWfqQ0AS4159Un+QpVLJoDK7hokVqbtNjwzdHVaTT\nDuZ7o8LwWMVnMI9AOPz6nGkiGVuA4ZA0RWw7aZ3BStjVuYqZUqOJKI9UwjJDJTv2\n9011CXfVAgMBAAECggEAJHHiuwm+kqyMurVrvBESBsYgALXkoN1hsqTlVcIbtqCh\nYko+l6mwJue9SffB6dUG1yEQFJqm14yG0Fi4XU/163mejnVr8feVaEVfTEwrGbiY\nDCM+6dPkpgtuflnRADtC2E5g2MOget1Lct2XAefHeYMdks0VICEaVXr6x3Wm+wsv\n2nIdpwO5XSYlz8cHQeG+mKr5f9srO1LrR/9pmLzpE4t4UebgNadq0vKpuDyEKFLT\nIku0ktrZrmkILUBDkxX+d2NSG9e7JUGqMyHvtAjGf/KGLe4+i/Eh1jcvHMjY/Kj3\nP7IGAEFxtUrfCd+u0ofvRM4gCvhrBSlb6pT0I27rewKBgQD2SIT2WMB36XIsZYzI\n+nUTWY86mWAZClqi3++9cSYPBrEIgM0/XZDrXwp/M1BQmhfsp817g7UBKhsmlbQz\nR3xooWqDPb9rgAsEU3Nh58RLCmDcWHUUDHuE45rQXSubMMRuy+2mut6Lr8ZaNOmx\nLy4Z2ZZ2wOuG8lpqs8pYUfTn2wKBgQDL2CGZUXTKF/hy0micmsFS288KEp9Sp9AM\nK7zcfN9lIDz8bfIuWlJ1G034XjELjCdOWGxahD35SDVh8i4XYGWfS/2AxbhROlez\nnpN16DOIZ2xntUGikQ91RBoWYQbPgmxv02hUjRJZYXNrmdQ3ky1BH5qR4C4brlxM\nXGlcf/5GDwKBgHhOaJUmOa7Z3KoPWTx8DGDNaQgJEEZrJmdV2PjDowHIFQbAVILV\npAs2PBxy5pLZE0LJnbjuV6cf+G9axdIe44kBANTnfvB2detBEKYM33iAs1wv4dFP\nX69Et8V9HeYLZolxGMBPnJLD5LMAEgA5ud1qyvNrviIHlV92QCvwrR/tAoGAGql+\nW4tn9zcDbCFRRYqIVsohXnPpGuqQL8dYwI4kuhlpYKsQzjdKKb8Uh7PqPlRqn7i5\nE23QnVZwhQskNDKLmDZcRgeWgCldZ0UKjJV+iAzfBQGUQCsxFml98Ado2KN6g3Xn\nY4fAKqiwbBaGx24csTPtB7+GyGAZ+nLr5QlovMkCgYEAtW119QGVX5VrK/sDo2Md\nA3lWcK9dhA8yoeNGjGonjxVmFahf7ff/cH7+AW722T4vZ8EmLoGid8zOBqd6cLn6\nAKNZ927p3StVwwLBSlEm/pExPHJlPd8ijzYVoR4kNljbhI295dHZtuqykvm2Guw4\n4xZ3u8cshSW62sKN2uLE4iU=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-r43c4@food-rec-6b763.iam.gserviceaccount.com",
  "client_id": "112628574270557749468",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-r43c4%40food-rec-6b763.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

cred = credentials.Certificate(service_account_info)
firebase_admin.initialize_app(cred, {
    'storageBucket': 'food-rec-6b763.appspot.com'
})

# Truy cập bucket của Firebase Storage
bucket = storage.bucket()
print("Đã kết nối tới Firebase Storage")

blobs = bucket.list_blobs(prefix='static/uploads/')
for blob in blobs:
    print(blob.name)

# blobs = bucket.list_blobs(prefix='static/')  # Thay 'images/' bằng thư mục của bạn

# for blob in blobs:
#     print(blob.name)

# blob = bucket.blob('static/uploads/xoilac.jpg')  # Thay 'images/your_image_file.jpg' bằng đường dẫn của tệp

# # Tải xuống tệp
# blob.download_to_filename('local_image.jpg')
# print("Tệp đã được tải xuống dưới tên 'local_image.jpg'")
