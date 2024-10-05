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
    read_to_string("/usr/src/app/files/log.txt")
        .await
        .unwrap_or_else(|_| "Cannot read log file".to_string())
}
