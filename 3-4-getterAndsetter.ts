// {
//   // getter, setter는 멤버변수처럼 사용을 한다. 어떤 계산을 할때 유용하게 사용 할 수 있는 장점이 있다.

//   class User {
//     private firstName: string;
//     private lastName: string; // 5. 생성자에 전달된 이름을 변경할수 없으면 외부에서 변경이 불가하도록 private 설정
//     get fullName(): string {
//       return `${this.firstName} ${this.lastName}`; // 3. get을 이용해 fullName에 접근할때마다 새로운 데이터를 만들고 개선이 가능!
//     }
//     constructor(firstName: string, lastName: string) {
//       this.firstName = firstName;
//       this.lastName = lastName;
//       // this.fullName = `${firstName} ${lastName}`; 2. 지우고
//     }
//   }
//   const user = new User("kang", "muni");
//   console.log(user.fullName);
//   user.firstName = "Crush";
//   console.log(user.fullName); // 1. kang muni 나옴 이미 할당 된 값이 유지됨.
//   // 4. fullName이 함수처럼 되어있지만 멤버변수에 접근하는것처럼 이 상태를 유지해서 호출한다.
// }

// ✨ 위 코드 간결하게 하는 방법과 getter setter 사용법
{
  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    private internalAge = 5;
    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      //private한 internalAge 값을 set을 통해 데이터 값이 변경 될 수 있도록 만들수 있다.
      if (num < 0) {
        throw new Error("유효성 검사를 할 수 있다");
      }
      this.internalAge = num;
    }
    constructor(private firstName: string, private lastName: string) {}
  }
  const user = new User("kang", "muni");
  console.log(user.age);
  user.age = 9;
  console.log(user.age);
}
