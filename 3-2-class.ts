{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeMaker {
    static BEANS_GAMN_PER_SHOT: number = 7; // class Level
    // 클래스에서 정해진 변하지 않는 값이기에 중복적으로 내뿜어서 데이터 낭비 할 필요가 없음
    coffeeBeans: number = 0; // instance (object) Level

    constructor(coffeeBeans: number) {
      // 클래스를 이용해서 오브젝트를 만들때 항상 처음에 호출 되는 함수이다.
      // (instance를 만들때 항상 호출 되는 함수)
      this.coffeeBeans = coffeeBeans;
    }

    // constructor를 호출하지 않고 새로운 커피머신을 만들고 싶어요!
    // class Level에서 활용하고 싶으면 static을 사용하면 돼요!
    static makeMachine(coffeeBeans: number): CoffeMaker {
      return new CoffeMaker(coffeeBeans);
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeMaker.BEANS_GAMN_PER_SHOT) {
        // this.BEANS_GAMN_PER_SHOT 아님!!!
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeMaker.BEANS_GAMN_PER_SHOT;
      return {
        shots: shots,
        hasMilk: false,
      };
    }
  }

  const maker = new CoffeMaker(37); // 여기있는 괄호는 생성자를 호출하는것!
  console.log(maker);
  const maker2 = new CoffeMaker(27);
  // maker2.makeMachine(17) makeMachine 함수에 static이 없다면 이렇게 사용해야겠죠?
  console.log(maker2);
  const maker3 = CoffeMaker.makeMachine(17);
  console.log(maker3);
}
