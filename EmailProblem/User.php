<?php
    class User {
        private string $username;
        private string $password;
        private string $emailAddress;

        public function __construct(string $username, string $password, string $emailAddress) {
            $this->username = $username;
            $this->password = $password;
            $this->emailAddress = $emailAddress;
        }

        public function getUsername() : string {
            return $this->username;
        }
        public function getPassword() : string {
            return $this->password;
        }
        public function getEmailAddress() : string {
            return $this->emailAddress;
        }
        
        // we can add validation and sanitaion rules for each property to the following functions for the desired requirements
        public function setUsername(string $username) {
            $this->username = $username;
        }
        public function setPassword(string $password) {
            $this->password = $password;
        }
        public function setEmailAddress(string $emailAddress) {
            $this->emailAddress = $emailAddress;
        }
    }
?>