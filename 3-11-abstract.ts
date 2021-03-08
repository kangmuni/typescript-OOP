{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  abstract class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GAMN_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // static makeMachine(coffeeBeans: number): CoffeeMachine {
    //   return new CoffeeMachine(coffeeBeans);
    // }
    // Cannot create an instance of an abstract class.

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    clean() {
      console.log("cleaning the machine...✨");
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

    // 자식클래스마다 달라질수 있는 행동이 있다면 그 함수앞에  abstract를 붙인다.
    // 자식클래스마다 다르게 구현해야하기때문에, 즉 접근해야하기때문에 private > protected
    protected abstract extract(shots: number): CoffeeCup;
    //{
    // 추상적이기 때문에 구현사항은 적어서는 안됨!
    // abstract를 구현하는 함수에서 따로 작성 해줘야함!
    //   console.log(`pulling ${shots} shots...☕️`);
    //   return {
    //     shots,
    //     hasMilk: false,
    //   };
    //}

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }

    private steamMilk(): void {
      console.log("Steaming some milk");
    }

    // makeCoffee(shots: number): CoffeeCup {
    //   const coffee = super.makeCoffee(shots);
    //   this.steamMilk();
    //   return {
    //     shots,
    //     hasMilk: true,
    //   };
    // }
    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    // makeCoffee(shots: number): CoffeeCup {
    //   const coffee = super.makeCoffee(shots); // super를 쓰지 않는 실수를 할 수도 있다.
    //   return {
    //     ...coffee,
    //     //shots, 위 커피말고 샷으로 쓴다던가.. 이들을 좀 안전하게 하고싶으면 abstract 위로 고고씽
    //     hasSuger: true,
    //   };
    // }
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true,
      };
    }
  }

  const machines: CoffeeMaker[] = [
    // new CoffeeMachine(16),
    new CaffeLatteMachine(16, "S"),
    new SweetCoffeeMaker(16),
    // new CoffeeMachine(16), 커피머신은 추상클래스이기 때문에 이것을 구현한 클래스만 사용이 가능하다✨
    new CaffeLatteMachine(16, "S"),
    new SweetCoffeeMaker(16),
  ];

  machines.forEach((machine) => {
    console.log("-----------------------------");
    machine.makeCoffee(1);
  });
}

// 커피머신은 이 자체로 오브젝트를 생성할 수 없는 추상적인 클래스이다.
// 공통적인 기능이 있다면 구현할 수 있고
// 구현하는 기능마다 달라져야 하는 기능들이 있다면 abstract 메소드로 정의 할 수 있다.
// 함수이름은 무엇인지 어떤인자를 받아고 어떤걸 리턴하는지만 정의 할 수 있다
// 공통적으로 쓰는 기능들은 내부에서만 필요한건 private
// 외부에서 호출할 수 있는것은 public
// 구현하는 클래스마다 달라져야하는 abstract 함수만 abstract 클래스를 구현하는 곳에서 구현해주면 된다.

// 상속을 이용할때 abstract를 이렇게 이용할 수도 있지만
// 너무 수직적으로 깊은 상속을 이용하기보다 가능하면 composition을 이용하는것이 좋다!!!
// 상속도 유용하니 상속과 컴포지션을 이용해서 깊은 수직관계를 피해보자!!
// 생각하는 힘을 길러주세요~
