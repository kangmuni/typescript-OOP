{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 나는 이런 행동을 하고있어 라고 명시해두는 계약서 같은 아이
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }
  // 🌼 커피메이커라고 하는 인터페이스는 메이크 커피라는 함수가 있어 샷은 넘버를 받고 커피컵을 리턴 받을수있어!

  // 키피머신 클래스는 커피메이커라는 인터페이스를 구현하는 아이이다.
  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GAMN_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GAMN_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GAMN_PER_SHOT;
    }

    private preheat(): void {
      console.log("heating up...🔥");
    }

    private extract(shots: number): CoffeeCup {
      console.log(`pulling ${shots} shots...☕️`);
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
    // 🌼 구현해 둠!
  }

  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  maker.fillCoffeeBeans(37);
  maker.makeCoffee(2);
  console.log(maker);
  // 정말 필요한 함수들만 노출해서 간단하고 심플하게 만든다.
  // 캡슐화를 통해 추상화도 가능하고, interface를 통해서도 가능하다.

  // const maker2: CoffeeMaker = CoffeeMachine.makeMachine(32);
  // 커피머신은 커피메이커의 인터페이스를 구현하지만 커피메이커 안에는 makeCoffee함수만 존재하기 때문에
  // 때에 따라서 내가 얼마만큼의 행동을 약속할건지 허용할건지 보장할건지 결정 할 수 있다.
  // maker2.fillCoffeeBeans(37);
  // maker2.makeCoffee(2);
}
