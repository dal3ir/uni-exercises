<!DOCTYPE html>
<html>
<head>
    <title>Exemple d'inclusion d'image et de vidéo en PHP</title>
    <style>
        body {
            background-image: url('203540.jpg');
            background-size: cover;
            background-position: center;
        }
        video {
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
<?php
$image_path = '203540.jpg';
$video_path = 'meme.mp4';
?>

<video width="520" height="340" controls>
    <source src="<?php echo $video_path; ?>" type="video/mp4">
    Votre navigateur ne prend pas en charge la vidéo HTML5.
</video>
</body>
</html>