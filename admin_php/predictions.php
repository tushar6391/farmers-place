<?php require_once 'includes/auth.php'; ?>
<?php require_once 'config/db.php'; ?>

<!DOCTYPE html>
<html>
<head>
    <title>Predictions</title>
    <style>
        body { font-family: Arial; margin: 0; background: #f0f0f0; }
        .navbar { background: #4CAF50; padding: 15px 30px; color: white; display: flex; justify-content: space-between; }
        .container { padding: 30px; }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; }
        th { background: #4CAF50; color: white; padding: 12px; text-align: left; }
        td { padding: 12px; border-bottom: 1px solid #eee; }
        .nav-links a { color: white; margin-left: 20px; text-decoration: none; }
    </style>
</head>
<body>
    <div class="navbar">
        <h3>🌾 Farmer's Place Admin</h3>
        <div class="nav-links">
            <a href="dashboard.php">Dashboard</a>
            <a href="farmers.php">Farmers</a>
            <a href="logout.php">Logout</a>
        </div>
    </div>

    <div class="container">
        <h2>Crop Predictions</h2>
        <table>
            <tr>
                <th>Farmer ID</th>
                <th>Predicted Crop</th>
                <th>Nitrogen</th>
                <th>Phosphorus</th>
                <th>Potassium</th>
                <th>pH</th>
                <th>Timestamp</th>
            </tr>
            <?php
                $stmt = $pdo->query("SELECT f.full_name, s.nitrogen, s.phosphorus, s.potassium, s.ph, s.recorded_at
                                     FROM soil_records s
                                     JOIN farmers_farmer f ON s.farmer_id = f.id
                                     ORDER BY s.recorded_at DESC");
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            ?>
            <tr>
                <td><?php echo $row['full_name']; ?></td>
                <td>-</td>
                <td><?php echo $row['nitrogen']; ?></td>
                <td><?php echo $row['phosphorus']; ?></td>
                <td><?php echo $row['potassium']; ?></td>
                <td><?php echo $row['ph']; ?></td>
                <td><?php echo $row['recorded_at']; ?></td>
            </tr>
            <?php } ?>
        </table>
    </div>
</body>
</html>