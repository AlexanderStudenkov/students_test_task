<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// подключение базы данных и файл, содержащий объекты 
include_once '../config/database.php';
include_once '../objects/student.php';

// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();

// инициализируем объект 
$student = new Student($db);
 
// запрашиваем записи
$stmt = $student->read();
$num = $stmt->rowCount();

// проверка, найдено ли больше 0 записей 
if ($num>0) {

    $students_arr=array();
    $students_arr["records"]=array();

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
        extract($row);

        $student_item=array(
            "id" => $id,
            "name" => $name,
            "course" => $course
        );

        array_push($students_arr["records"], $student_item);
    }

    // устанавливаем код ответа - 200 OK 
    http_response_code(200);

    echo json_encode($students_arr);
}

else {

    // установим код ответа - 404 Не найдено 
    http_response_code(404);

    // сообщаем пользователю, что записи не найдены 
    echo json_encode(array("message" => "Записи не найдены."), JSON_UNESCAPED_UNICODE);
}