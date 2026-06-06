<?php require_once 'includes/auth.php'; ?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <style>
        body { font-family: Arial; margin: 0; background: #f0f0f0; }
        .navbar { background: #4CAF50; padding: 15px 30px; color: white; display: flex; justify-content: space-between; }
        .container { padding: 30px; }
        .cards { display: flex; gap: 20px; flex-wrap: wrap; }
        .card { background: white; padding: 20px; border-radius: 8px; width: 200px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .card h2 { font-size: 40px; color: #4CAF50; margin: 0; }
        .card p { color: #666; }
        .nav-links a { color: white; margin-left: 20px; text-decoration: none; }
    </style>
</head>
<body>
    <div class="navbar">
        <h3>🌾 Farmer's Place Admin</h3>
        <div class="nav-links">
            <a href="farmers.php">Farmers</a>
            <a href="predictions.php">Predictions</a>
            <a href="logout.php">Logout</a>
        </div>
    </div>

    <div class="container">
        <h2>Dashboard</h2>
        <?php
            require_once 'config/db.php';
            $farmers = $pdo->query("SELECT COUNT(*) FROM farmers")->fetchColumn();
            $soil = $pdo->query("SELECT COUNT(*) FROM soil_records")->fetchColumn();
            $fertilizer = $pdo->query("SELECT COUNT(*) FROM fertilizer_recommendations")->fetchColumn();
        ?>
        <div class="cards">
            <div class="card">
                <h2><?php echo $farmers; ?></h2>
                <p>Total Farmers</p>
            </div>
            <div class="card">
                <h2><?php echo $soil; ?></h2>
                <p>Soil Records</p>
            </div>
            <div class="card">
                <h2><?php echo $fertilizer; ?></h2>
                <p>Fertilizer Suggestions</p>
            </div>
        </div>
    </div>
</body>
</html>