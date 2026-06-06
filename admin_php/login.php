<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hardcoded admin for now
    if ($username === 'admin' && $password === 'admin123') {
        $_SESSION['admin'] = true;
        header('Location: dashboard.php');
        exit;
    } else {
        $error = "Invalid credentials";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Login</title>
    <style>
        body { font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0; }
        .box { background: white; padding: 30px; border-radius: 8px; width: 300px; }
        input { width: 100%; padding: 8px; margin: 8px 0; box-sizing: border-box; }
        button { width: 100%; padding: 10px; background: #4CAF50; color: white; border: none; cursor: pointer; }
        .error { color: red; }
    </style>
</head>
<body>
    <div class="box">
        <h2>Admin Login</h2>
        <?php if (isset($error)) echo "<p class='error'>$error</p>"; ?>
        <form method="POST">
            <input type="text" name="username" placeholder="Username" required/>
            <input type="password" name="password" placeholder="Password" required/>
            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>