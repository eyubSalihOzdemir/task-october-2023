<?php
    require 'Mail.php';
    require 'User.php';

    $mail = new Mail();
    
    $user1 = new User("BlackWidow", "imbeautiful", "blackwidow@marvel.com");
    $user2 = new User("SpiderMan", "imissironman", "spiderman@marvel.com");
    $user3 = new User("IronMan", "imrich", "ironman@marvel.com");

    $mail->sendRegistrationEmail($user1->getEmailAddress(), $user1->getUsername());
    $mail->sendPasswordReminderEmail($user2->getEmailAddress(), $user2->getUsername(), $user2->getPassword());
    $mail->sendUnsubscribeEmail($user3->getEmailAddress(), $user3->getUsername());
?>