#devTinder APIs

auth router
-POST/signup
-POST/login
-POST/logout

profile router
-GET/profile/view
-PATCH/profile/edit
-PATCH/profile/password

connectionreqrouter
-POST/request/send/interested/:userId
-POST/request/send/ignored/:userId

connection req router
-POST/request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

user ROuter
-GET /user/connections
-GET /user/requests
-GET /user/feed


STATUS: ignore accepted interested rejected