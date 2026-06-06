<?php require_once 'includes/auth.php'; ?>
<?php require_once 'config/db.php'; ?>

<!DOCTYPE html>
<html>
<head>
    <title>Farmers</title>
    <style>
        body { font-family: Arial; margin: 0; background: #f0f0f0; }
        .navbar { background: #4CAF50; padding: 15px 30px; color: white; display: flex; justify-content: space-between; }
        .container { padding: 30px; }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; }
        th { background: #4CAF50; color: white; padding: 12px; text-align: left; }
        td { padding: 12px; border-bottom: 1px solid #eee; }
        tr:hover { background: #f9f9f9; }
        .nav-links a { color: white; margin-left: 20px; text-decoration: none; }
    </style>
</head>
<body>
    <div class="navbar">
        <h3>🌾 Farmer's Place Admin</h3>
        <div class="nav-links">
            <a href="dashboard.php">Dashboard</a>
            <a href="predictions.php">Predictions</a>
            <a href="logout.php">Logout</a>
        </div>
    </div>

    <div class="container">
        <h2>All Farmers</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Registered</th>
            </tr>
            <?php
                $stmt = $pdo->query("SELECT * FROM farmers_farmer ORDER BY created_at DESC");
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            ?>
            <tr>
                <td><?php echo $row['id']; ?></td>
                <td><?php echo $row['full_name']; ?></td>
                <td><?php echo $row['email']; ?></td>
                <td><?php echo $row['phone']; ?></td>
                <td><?php echo $row['location']; ?></td>
                <td><?php echo $row['created_at']; ?></td>
            </tr>
            <?php } ?>
        </table>
    </div>
</body>
</html>