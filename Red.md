```js
# From this command:
-e POSTGRES_USER=myuser          # ← Take this
-e POSTGRES_PASSWORD=mypassword  # ← Take this
-e POSTGRES_DB=myapp_db          # ← Take this
-p 5432:5432                     # ← Take the first 5432 (host port)

# Build this URL:
postgresql://Nishad:Kshamded@localhost:5432/Library?schema=public

```