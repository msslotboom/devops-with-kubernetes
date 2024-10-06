use rocket::tokio::fs::read_to_string;
use rocket::{get, routes};

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    let _ = rocket::build()
        .mount("/", routes![read_log])
        .launch()
        .await?;
    Ok(())
}
#[get("/")]
async fn read_log() -> String {
    let log = read_to_string("/usr/src/app/files/log.txt")
        .await
        .unwrap_or_else(|_| "Cannot read log file".to_string());

    let pongs = read_to_string("/usr/src/app/files/pongs.txt")
        .await
        .unwrap_or_else(|_| "Cannot read pong file".to_string());

    let log_printout = log.lines().last().unwrap_or("Log file is empty.");
    let pong_printout = "Ping/Pongs: ".to_owned() + &pongs;
    format!("{}\n{}", log_printout, pong_printout)
}
