use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main(){
  println!("猜数字");

  let secret_number = rand::thread_rng().gen_range(1,101);
  loop{


    println!("请输入你的数字");

    let mut guess = String::new();

    io::stdin().read_line(&mut guess).expect("读取数据错误");

    let guess: u32 =guess.trim().parse().expect("请输入一个数字");
    match guess.cmp(&secret_number){
      Ordering::Less=>println!("太小了"),
      Ordering::Greater=>println!("太大了"),
      Ordering::Equal=>{
        println!("相等");
        break;
      },
    }
  }

}
