<?php
    require 'Constants.php';

    class Mail {
        // I don't think there's any need to move these properties to an outside class.
        // I'm going to leave these here for ease of use.
        private $authentication = true;
        private $host = '192.168.1.33';
        private $user = 'user';
        private $password = 'pAss12345';

        public function __construct() {}
        
        // reset properties to default after each use to prevent any conflict
        private function resetToDefaultProperties() {
            $this->authentication = true;
            $this->host = '192.168.1.33';
            $this->user = 'user';
            $this->password = 'pAss12345';
        }

        public function sendRegistrationEmail($to, $username) {
            $this->authentication = true;
            $this->user = 'registration';
            $this->password = 'r3g1str0';
            $this->host = '192.168.1.66';
            
            // it's a good idea to combine every string (and other types of) constant in one place
            // to be able to find and change it very easily in the future
            $subject = sprintf(Constants::REGISTRATION_SUBJECT, $username);
            $body = sprintf(Constants::REGISTRATION_BODY, $username);

            $this->sendEmail($to, $subject, $body, true);
            $this->resetToDefaultProperties();
        }

        public function sendUnsubscribeEmail($to, $username) {
            $this->authentication = true;
            $this->user = 'user';
            $this->password = 'pAss12345';
            $this->host = '192.168.33';

            $subject = Constants::UNSUBSCRIBE_SUBJECT;
            $body = sprintf(Constants::UNSUBSCRIBE_BODY, $username);

            $this->sendEmail($to, $subject, $body);
            $this->resetToDefaultProperties();
        }

        public function sendPasswordReminderEmail($to, $username, $password) {
            $this->authentication = true;
            $this->user = NULL;
            $this->password = NULL;
            $this->host = '192.168.1.22';

            $subject = Constants::PASSWORD_REMINDER_SUBJECT;
            $body = sprintf(Constants::PASSWORD_REMINDER_BODY, $username, $username, $password);

            $this->sendEmail($to, $subject, $body);
            $this->resetToDefaultProperties();
        }

        private function sendEmail($to, $subject, $body, $is_html = false, Array $para_cc = array(), Array $para_bcc = array()) 
        { 
            //... Sends the email and returns true if everything went well 
            // or throws an exception if it fails 
        }
    }
?>