### Set up the variables general to PowerShell console

- `Set-Variable -Name "NODE_ENV" -Value "development"`
- `Set-Variable -Name "PORT" -Value "3000"`

- `Set-Variable -Name "MONGODB_URL" -Value "localhost"`
- `Set-Variable -Name "MONGODB_PORT" -Value "27017"`
- `Set-Variable -Name "MONGODB_DATABASE" -Value "admin"`
- `Set-Variable -Name "MONGODB_USERNAME" -Value "usr_name"`
- `Set-Variable -Name "MONGODB_PASSWORD" -Value "pr_123"`

- `Set-Variable -Name "REDIS_URL" -Value "localhost"`
- `Set-Variable -Name "REDIS_PORT" -Value "6379"`
- `Set-Variable -Name "REDIS_PASSWORD" -Value "1"`
- `Set-Variable -Name "REDIS_PREFIX" -Value "product"`

- `Set-Variable -Name "RABBITMQ_URL" -Value "localhost"`
- `Set-Variable -Name "RABBITMQ_PORT" -Value "5672"`
- `Set-Variable -Name "RABBITMQ_USERNAME" -Value "user"`
- `Set-Variable -Name "RABBITMQ_PASSWORD" -Value "1"`
- `Set-Variable -Name "RABBITMQ_QUEUE" -Value "product-queue"`


### Set up the variables general to DOS console

- `SET NODE_ENV=development`
- `SET PORT=3000`

- `SET MONGODB_URL=localhost`
- `SET MONGODB_PORT=27017`
- `SET MONGODB_DATABASE=admin`
- `SET MONGODB_USERNAME=usr_name`
- `SET MONGODB_PASSWORD=pr_123`

- `SET REDIS_URL=localhost`
- `SET REDIS_PORT=6379`
- `SET REDIS_PASSWORD=1`
- `SET REDIS_PREFIX=product`

- `SET RABBITMQ_URL=localhost`
- `SET RABBITMQ_PORT=5672`
- `SET RABBITMQ_USERNAME=user`
- `SET RABBITMQ_PASSWORD=1`
- `SET RABBITMQ_QUEUE=product-queue`

### Docker compose commands

- `docker-compose up --build -d`
- `docker-compose down`
