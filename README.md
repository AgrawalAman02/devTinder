# DevTinder

## Overview
DevTinder is a Node.js-based REST API that facilitates connections between developers. Similar to social networking platforms, it allows users to create profiles, showcase their skills, send connection requests, and build their professional network.

> **Note:** This is currently a backend-only project. Frontend development is planned for future releases.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ORM
- **Authentication:** JWT & bcrypt
- **Security:** bcrypt, cookie-parser, CORS
- **Validation:** validator.js
- **Development:** Postman for API testing

## Key Features
- **User Authentication:** Secure signup, login, and logout functionality
- **Profile Management:** View and edit personal profiles
- **Skills Showcase:** Add up to 10 skills to highlight expertise
- **Connection System:** Send, accept, or reject connection requests
- **Feed Generation:** View potential connections filtered by connection status
- **Password Management:** Secure password update with validation

## 📡 API Documentation
> Coming soon: Detailed Postman collection for testing all endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register new user |
| POST | `/login` | User login |
| POST | `/logout` | User logout |

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile/view` | View logged-in user's profile |
| PATCH | `/profile/edit` | Update profile |
| PATCH | `/profile/password` | Change password with validation |

### Connections
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/request/send/:status/:userId` | Send connection request |
| POST | `/request/review/:status/:requestId` | Accept/reject connection requests |
| GET | `/user/requests/received` | View pending connection requests |
| GET | `/user/connections` | View connections |
| GET | `/user/feed` | View potential matches |

## Installation

```bash
# Clone repository
git clone https://github.com/yourusername/devTinder.git

# Navigate to project
cd devTinder

# Install dependencies
npm install

# Create .env file
echo PORT=3000 > .env
echo MONGODB_URL=your_mongodb_url >> .env
echo JWT_SECRET_KEY=your_secret >> .env

# Start server
npm run dev
```

## Environment Variables
```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

## Usage
1. Register an account via the `/signup` endpoint
2. Login to receive an authentication token
3. Update your profile with skills and information
4. Browse other developers in the feed
5. Send connection requests to developers you'd like to collaborate with
6. Accept or reject incoming connection requests

## Security Features
- Encrypted password storage
- JWT-based authentication
- Secure cookie handling
- Input validation
- CORS protection

## Author
Aman Agrawal

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---
*Connect with developers. Build your network. Create something amazing together.*

> Note: API documentation and Postman collection will be updated soon.