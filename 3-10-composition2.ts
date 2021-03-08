{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  // Favor COMPOSITION over inheritance!!!!!!!!!!!!!
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    // 이 커피머신 하나면 우리가 필요한 모든것들을 할 수 있다.
    private static BEANS_GAMN_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(
      coffeeBeans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider
    ) {
      this.coffeeBeans = coffeeBeans;
    }

    // static makeMachine(coffeeBeans: number): CoffeeMachine {
    //   return new CoffeeMachine(coffeeBeans);
    // }

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
      const coffee = this.extract(shots);
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }
  }

  // 서로 인터페이스를 통해 의사소통을 할 수 있도록 만들어준다.
  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  // Milk
  class CheapMilksteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("Steaming some milk...🥛");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class FancyMilksteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("Fancy Steaming some milk...🥛");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class ColdMilksteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("Fancy Steaming some milk...🥛");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class NoMilk implements MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // Sugar
  class CandySugarMixer implements SugarProvider {
    private getSugar() {
      console.log("Getting some sugar from candy 🍭");
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: true,
      };
    }
  }

  class SugarMixer implements SugarProvider {
    private getSugar() {
      console.log("Getting some sugar from jar!!!");
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: true,
      };
    }
  }

  class NoSugar implements SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  //
  // class CaffeLatteMachine extends CoffeeMachine {
  //   constructor(
  //     beans: number,
  //     public readonly serialNumber: string,
  //     private milkFother: MilkFrother
  //   ) {
  //     super(beans);
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.milkFother.makeMilk(coffee);
  //   }
  // }

  // class SweetCoffeeMaker extends CoffeeMachine {
  //   constructor(private beans: number, private sugar: SugarProvider) {
  //     super(beans);
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.sugar.addSugar(coffee);
  //   }
  // }

  // class SweetCaffeLatteMachine extends CoffeeMachine {
  //   constructor(
  //     private beans: number,
  //     private milk: MilkFrother,
  //     private sugar: SugarProvider
  //   ) {
  //     super(beans);
  //   }
  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     const sugarAdded = this.sugar.addSugar(coffee);
  //     return this.milk.makeMilk(sugarAdded);
  //   }
  // }

  // Milk
  const cheapMilkMaker = new CheapMilksteamer();
  const fancyMilkMaker = new FancyMilksteamer();
  const coldMilkMaker = new ColdMilksteamer();
  const noMilk = new NoMilk();

  // Sugar
  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();
  const noSugar = new NoSugar();

  //
  const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
  const sweetMachine = new CoffeeMachine(12, noMilk, sugar);

  const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSugar);
  const coldlatteMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);
  const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySugar);
  // 인터페이스를 통해 규약된 아이들만 전달 되기 때문에 원할 떄마다 다른 부품을 끼워서 원하는 용도를 만들어서 사용이 가능하다.

  // 상속을 전혀 하지 않고도 커피머신이라는 클래스에 우리가 필요한 다양한 형태의 우유와 설탕을 주입하면서 원하는 오브젝트를 만들 수 있었다.
  // 원하는대로 조립하면서 사용 할 수 있다!!!
  // 컴포지션만 사용해야한다 이런것은 아님 상속이 유용하고 상속이 꼭 필요한 경우도 있다.
  // 다만 너무 수직적인 관계가 아닌지 상속이 너무 깊다면 컴포지션을 사용할 순 없는지
  // 어떻게 더 필요한 기능을 조립해서 확장이 가능하고 재사용성이 좋고 유지보수가 높고 퀄리티가 뛰어난 코드 개선이 중요하다.
  // 오버엔지니어링 하지맙시다 @_@ 코드를 복잡하게 디자인 할 필요 없음 중간점을 찾아서 하는게 개발자의 센스🔫
}
