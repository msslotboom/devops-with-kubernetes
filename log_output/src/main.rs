use rand::{distributions::Alphanumeric, Rng};
use chrono::Local;
use std::thread::sleep;
use std::time::Duration;


fn main(){
	let random_string: String = generate_string(16);
    loop{
        let now = Local::now();
        println!("{},  {}", now.to_string(), random_string);
        sleep(Duration::from_secs(5));
    }
}

fn generate_string(length: usize) -> String{
	let rng = rand::thread_rng();
	rng.sample_iter(&Alphanumeric)
		.take(length)
		.map(char::from)
		.collect()
}