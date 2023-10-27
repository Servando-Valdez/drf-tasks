
# Task Manager

### Task Manager is a task management application designed to help you keep an organized record of your to-dos. With Task Manager, you can efficiently create, edit and delete your daily tasks.

## Run Backend

### Create virtual environment

```
python -m venv venv
```

### Activate virtual environment
Windows:
```
./venv/Scripts/Activate.ps1
```
Linux:
```
./venv/bin/activate
```

### Download dependencies
```
pip install -r requirements.txt
```

### Copy environment 
Duplicate the .env.example file and save the duplicate as ".env". Make any necessary changes in the newly created .env file.

### Run docker
```
docker-compose up -d
```

### Run migrations

```
python manage.py makemigrations
```

```
python manage.py migrate
```

### Run backend

```
python manage.py makemigrations
```

## Run Frontend

### Move to tasks folder
```
cd front
```

### Download dependencies
```
npm i
```

### Run frontend
```
npm run dev
```

## Swagger

Copy next url

```
http://localhost:8000/docs/
```