<?php
require "vendor/autoload.php";
if ('POST' !== $_SERVER['REQUEST_METHOD']) {
    http_response_code(405);
    die;
}
$AccountSid = "insert your own sid here";
$AuthToken = "insert your own token here";

$client = new Services_Twilio($AccountSid, $AuthToken);
try
{
    $message = \Aws\Sns\Message::fromRawPostData();
    $validator = new \Aws\Sns\MessageValidator();
    $validator->validate($message);

    if (in_array($message['Type'],
    ['SubscriptionConfirmation', 'UnsubscribeConfirmation']))
    {
        file_get_contents($message['SubscribeURL']);
    }
    else
    {
    $client->account->messages->create(array(
        "From" => "telephone", //in format +99999999999
        "To" => "telephone", //in format +99999999999
        "Body" => $message['Message'],
	));
    }
}
catch (Services_Twilio_RestException $e)
{
    echo $e->getMessage();
}