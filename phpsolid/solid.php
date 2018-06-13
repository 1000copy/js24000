<?php
class Circle {
    public $radius;
    public function __construct($radius) {
        $this->radius = $radius;
    }
}
class Square {
    public $length;
    public function __construct($length) {
        $this->length = $length;
    }
}
class AreaCalculator {
    protected $shapes;
    public function __construct($shapes = array()) {
        $this->shapes = $shapes;
    }
	public function sum() {
	    foreach($this->shapes as $shape) {
	        if(is_a($shape, 'Square')) {
	            $area[] = pow($shape->length, 2);
	        } else if(is_a($shape, 'Circle')) {
	            $area[] = pi() * pow($shape->radius, 2);
	        }
	    }

	    return array_sum($area);
	}   
    public function output() {
        return implode('', array(
            "",
                "Sum of the areas of provided shapes: ",
                $this->sum(),
            ""
        ));
    }
}

class VolumeCalculator extends AreaCalculator {
    public function __construct($shapes = array()) {
        parent::__construct($shapes);
    }

    public function sum() {
        // logic to calculate the volumes and then return and array of output
        return ($summedData);
    }
}    
class SumCalculatorOutputter {
    protected $calculator;

    public function __constructor(AreaCalculator $calculator) {
        $this->calculator = $calculator;
        echo $calculator;
        echo $this->calculator;
    }

    public function JSON() {
        $data = array(
            'sum' => $this->calculator->sum()
        );

        return json_encode($data);
    }

    public function HTML() {
        return implode('', array(
            '',
                'Sum of the areas of provided shapes: ',
                $this->calculator->sum(),
            ''
        ));
    }
}    
$shapes = array(
    new Circle(2),
    new Square(5),
    new Square(6)
);
$solidShapes = array(
    new Circle(2),
    new Square(5),
    new Square(6)
);
// $areas = new AreaCalculator($shapes);
// echo $areas->output();
$areas = new AreaCalculator($shapes);
$volumes = new AreaCalculator($solidShapes);
$output = new SumCalculatorOutputter($areas);
$output2 = new SumCalculatorOutputter($volumes);

echo $output->HTML();
echo $output2->HTML();

?>