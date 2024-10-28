use rocket::tokio::fs::read_to_string;
use rocket::{get, routes};
use reqwest::Error;

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    let _ = rocket::build()
        .mount("/log", routes![read_log])
        .launch()
        .await?;
    Ok(())
}
#[get("/")]
async fn read_log() -> String {
    let log = read_to_string("/usr/src/app/files/log.txt")
        .await
        .unwrap_or_else(|_| "Cannot read log file".to_string());

    let pongs = fetch_pongs()
        .await
        .unwrap_or_else(|_| "fetching pongs failed".to_string());

    let log_printout = log.lines().last().unwrap_or("Log file is empty.");
    let pong_printout = "Ping/Pongs: ".to_owned() + &pongs;
    format!("{}\n{}", log_printout, pong_printout)
}

async fn fetch_pongs() -> Result<String, Error> {
    let url = "http://pingpong-svc:1235/pingpong";
    let response = reqwest::get(url).await?;
    let pongs = response.text().await?;
    Ok(pongs)
}