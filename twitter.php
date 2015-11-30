<head>
    <title>Twitter</title>
    
    <link rel="stylesheet" type="text/css" href="twitter-styles.css">
</head>
<body>
<script>

    function pageComplete(){
        $('.twitter-tweet').tweetLinkify();
    }
</script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

<script src="tweetLinkIt.js"></script>
    <div id="twitter-php-wrap">
<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "3371566054-E37WaRzT0NgvVe5RZ6QT6XHUusVDkSfSTqo5UWb",
    'oauth_access_token_secret' => "0vebULdHw7paGyvzTWjLd5aqeOMxPzCkaTLdXZ7Grqq2O",
    'consumer_key' => "VJmlAZkGbegA5eVOAvrbX2Z3e",
    'consumer_secret' => "3MlhTv0VePxYehpjbb1n4OZfnN5lLswGOA5rrsj02A1HFfVrHP"
);

/** URL for REST request, see: https://dev.twitter.com/docs/api/1.1/ **/
//$url = 'https://api.twitter.com/1.1/search/tweets.json';
//$requestMethod = 'POST';
//
///** POST fields required by the URL above. See relevant docs as above **/
//$postfields = array(
//    'screen_name' => 'usernameToBlock', 
//    'skip_status' => '1'
//);
//
///** Perform a POST request and echo the response **/
//$twitter = new TwitterAPIExchange($settings);
//echo $twitter->buildOauth($url, $requestMethod)
//             ->setPostfields($postfields)
//             ->performRequest();

/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
$url = 'https://api.twitter.com/1.1/search/tweets.json';
$getfield = '?q=linvillegorge';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
//echo $twitter->setGetfield($getfield)
//             ->buildOauth($url, $requestMethod)
//             ->performRequest();
             
             
$tweetData = json_decode($twitter->setGetfield($getfield)
                         ->buildOauth($url, $requestMethod)
                        ->performRequest(),$assoc = TRUE);
//echo $tweetData;

foreach($tweetData['statuses'] as $items)
    {
        echo "<div class='twitter-div'><img class='twitter-profile-pic' src='".$items['user']['profile_image_url'] . "'>";
        echo "<div class='twitter-text'><div class='name'>".$items['user']['name'] . "</div>";
        echo "<div class='profile-name'>@".$items['user']['screen_name'] . "</div>";
        echo "<div class='twitter-tweet'>" .$items['text'] . "</div></div>";
        echo "<img src='".$items['media']['media_url'] . "'>" . "</div>";
        echo "<script>pageComplete();</script>";
        
    }

?>

</div>
</body>