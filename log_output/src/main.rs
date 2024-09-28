use rand::{distributions::Alphanumeric, Rng};
use chrono::Local;
use std::thread::sleep;
use std::time::Duration;
use std::fs::OpenOptions;
use std::io::Write;
use rocket::{get, routes};
use rocket::tokio::fs::read_to_string;

#[rocket::main]
async fn main() -> Result<(), rocket::Error>{
	let random_string: String = generate_string(16);
    let mut file = OpenOptions::new()
		.append(true)
		.create(true)
		.open("log.txt")
		.expect("Cannot open file");

	rocket::tokio::spawn(async move{
		loop{
			let now = Local::now();
			let log_entry = format!("{}, {}\n", now.to_string(), random_string);
			print!("{}", log_entry);
			file.write_all(log_entry.as_bytes()).expect("Cannot write to file");
			sleep(Duration::from_secs(5));
		}
	});

	let _ = rocket::build()
        .mount("/", routes![read_log])
        .launch()
        .await?;
	Ok(())
}
#[get("/")]
async fn read_log() -> String {
    read_to_string("log.txt").await.unwrap_or_else(|_| "Cannot read log file".to_string())
}
fn generate_string(length: usize) -> String{
	let rng = rand::thread_rng();
	rng.sample_iter(&Alphanumeric)
		.take(length)
		.map(char::from)
		.collect()
}
