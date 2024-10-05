use chrono::Local;
use rand::{distributions::Alphanumeric, Rng};
use std::fs::OpenOptions;
use std::io::Write;
use std::thread::sleep;
use std::time::Duration;

fn main() {
    let mut file = OpenOptions::new()
        .append(true)
        .create(true)
        .open("/usr/src/app/files/log.txt")
        .expect("Cannot open file");

    let random_string: String = generate_string(16);
    loop {
        let now = Local::now();
        let log_entry = format!("{}, {}\n", now.to_string(), random_string);
        //  print!("{}", log_entry);
        file.write_all(log_entry.as_bytes())
            .expect("Cannot write to file");
        sleep(Duration::from_secs(5));
    }
}

fn generate_string(length: usize) -> String {
    let rng = rand::thread_rng();
    rng.sample_iter(&Alphanumeric)
        .take(length)
        .map(char::from)
        .collect()
}
