const htmlFormat = (username) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Template</title>
<style>
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  .container {
    max-width: 600px;
    margin: 20px auto;
    background: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  .header {
    background: #ff4500;
    padding: 10px 20px;
    color: #fff;
    text-align: center;
  }
  .header img {
    max-width: 180px;
    margin-bottom: 10px;
  }
  .content {
    padding: 20px;
    text-align: center;
  }
  .footer {
    background: #ff4500;
    color: #ffffff;
    text-align: center;
    padding: 10px 20px;
    line-height: 1.6;
  }
  .footer a {
    color: #ffffff;
    text-decoration: none;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src='cid:logo-cid' alt='MauKucing Logo'/>
      <h1>Welcome to MauKucing!</h1>
    </div>
    <div class="content">
      <h2>Hello ${username},</h2>
      <p>Thank you for sharing your adorable cat's moment with us!</p>
      <p>Your recent post has received a lot of love! Check out what others are saying about your furry friend.</p>
      <button style="background-color: #ff4500; color: #ffffff; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">View Your Post</button>
    </div>
    <div class="footer">
      <p>Need help or have questions? We're here for you!</p>
      <p>Contact us at <a href="mailto:support@maukucing.com">support@maukucing.com</a> or call us at <a href="tel:+123456789">+123 456 789</a>.</p>
      <p>Follow us on social media!</p>
      <a href="https://twitter.com/MIbraAP" style="margin-right: 8px;">🐦 Twitter</a>
      <a href="https://github.com/ItsMauls>📷 Github</a>
      <p>Stay pawsome!</p>
      <p>Team MauKucing</p>
    </div>
  </div>
</body>
</html>

</html>
`
module.exports = htmlFormat