<?php
class Student {

    private $conn;
    private $table_name = "students";

    // свойства объекта 
    public $id;
    public $name;
    public $course;

    // конструктор для соединения с базой данных 
    public function __construct($db){
        $this->conn = $db;
    }

	function read(){

		// выбираем все записи 
		$query = "SELECT
					id, name, course 
				FROM
					" . $this->table_name . "
				ORDER BY
					name";

		// подготовка запроса 
		$stmt = $this->conn->prepare($query);

		// выполняем запрос 
		$stmt->execute();

		return $stmt;
	}
	
	function create(){

		// запрос для вставки (создания) записей 
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
					name=:name, course=:course";

		// подготовка запроса 
		$stmt = $this->conn->prepare($query);

		// очистка 
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->course=htmlspecialchars(strip_tags($this->course));

		// привязка значений 
		$stmt->bindParam(":name", $this->name);
		$stmt->bindParam(":course", $this->course);

		// выполняем запрос 
		if ($stmt->execute()) {
			return true;
		}

		return false;
	}
	
	function readOne() {

		$query = "SELECT
					id, name, course
				FROM
					" . $this->table_name . "
				WHERE
					id = ?";

		// подготовка запроса 
		$stmt = $this->conn->prepare( $query );

		$stmt->bindParam(1, $this->id);

		// выполняем запрос 
		$stmt->execute();

		// получаем извлеченную строку 
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		// установим значения свойств объекта 
		$this->name = $row['name'];
		$this->course = $row['course'];
	}
	
	function update(){

		$query = "UPDATE
					" . $this->table_name . "
				SET
					name = :name,
					course = :course
				WHERE
					id = :id";

		// подготовка запроса 
		$stmt = $this->conn->prepare($query);

		// очистка 
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->course=htmlspecialchars(strip_tags($this->course));
		$this->id=htmlspecialchars(strip_tags($this->id));

		// привязываем значения 
		$stmt->bindParam(':name', $this->name);
		$stmt->bindParam(':course', $this->course);
		$stmt->bindParam(':id', $this->id);

		// выполняем запрос 
		if ($stmt->execute()) {
			return true;
		}

		return false;
	}
	
	function delete(){

		$query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

		// подготовка запроса 
		$stmt = $this->conn->prepare($query);

		// очистка 
		$this->id=htmlspecialchars(strip_tags($this->id));

		// привязываем id записи для удаления 
		$stmt->bindParam(1, $this->id);

		// выполняем запрос 
		if ($stmt->execute()) {
			return true;
		}

		return false;
	}
	
	
	
}
?>