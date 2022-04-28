<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// подключение файла для соединения с базой и файл с объектом 
include_once '../config/database.php';
include_once '../objects/student.php';

// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();

// подготовка объекта 
$student = new Student($db);

// установим свойство ID записи для чтения 
$student->id = isset($_GET['id']) ? $_GET['id'] : die();

// прочитаем детали для редактирования 
$student->readOne();

if ($student->name!=null) {

    // создание массива 
    $student_arr = array(
        "id" =>  $student->id,
        "name" => $student->name,
        "course" => $student->course
    );

    // код ответа - 200 OK 
    http_response_code(200);

    // вывод в формате json 
    echo json_encode($student_arr);
}

else {
    // код ответа - 404 Не найдено 
    http_response_code(404);

    // сообщим пользователю, что запсиь не существует 
    echo json_encode(array("message" => "Запсиь не существует."), JSON_UNESCAPED_UNICODE);
}
?>