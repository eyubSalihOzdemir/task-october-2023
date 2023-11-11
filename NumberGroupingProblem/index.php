<?php
    function groupNumbers(array $inputArray) : string{
        $isInGroup = true; // going to be used in the for loop while iterating to keep track if numbers are still in a group
        $firstNum = $inputArray[0]; // going to hold the first number of group. naturally has to start from the first number in the array
        $lastNum = NULL; // going to hold the last number of the group. if it stays NULL, that means the group only has 1 element
        $arrayLength = count($inputArray);
        $groupedArray = []; // each found new group will be held in this array as strings. we will combine the strings with a comma later on

        for($i=1; $i<$arrayLength; $i++) {
            // if the number is consecutive to the number before that
            // it means they're in a group
            if($inputArray[$i] - 1 == $inputArray[$i-1]) {
                // update the last number of the group
                $lastNum = $inputArray[$i];
            } else {
                // if numbers aren't consecutive, brake the cycle
                $isInGroup = false;
            }

            // if the cycle is broken, add the current knowledge to the array
            if(!$isInGroup) {
                $groupedArray[] = empty($lastNum) ? 
                "{$firstNum}" : 
                "{$firstNum}-{$lastNum}";

                // then fix the star and end points of the new cycle/group to be able to start over
                $firstNum = $inputArray[$i];
                $lastNum = NULL;
                $isInGroup = true;
            }

            // this means we are at the last element of the array
            // breake the cycle anyway
            if($i == $arrayLength - 1) {
                $groupedArray[] = empty($lastNum) ? 
                "{$firstNum}" : 
                "{$firstNum}-{$lastNum}";
            }
        }
        
        // combine the group elements with a comma and return as a string
        return implode(', ', $groupedArray);
    }

    $testArrays = array(
        array(1,2,3,5,6,8),
        array(1,3,5,7,9,11,13,15),
        array(1,2,3,4,5,6,7,8,9),
        array(1,2,3,4,5,9,10,12,13,15,19,20,21,22,30,54,55,57),
    );

    // test the function for each test array
    foreach($testArrays as $arr) {
        echo groupNumbers($arr);
        echo "<br>";
    }
?>