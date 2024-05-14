<?php
class Database
{
    private $server = "localhost";
    private $dbnome = "mais_code_laravel";
    private $user = "root";
    private $pass = "";

    public function connect()
    {
        try {
            $conn = new PDO(
                "mysql:host=" . $this->server . ";dbname=" . $this->dbnome,
                $this->user,
                $this->pass
            );
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database erro: " . $e->getMessage();
        }
    }
}
