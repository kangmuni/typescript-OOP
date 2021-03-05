{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 캡슐화는 클래스를 만들때 외부에서 접근할 수 있는게 무엇인지 내부적으로만 가지고 있어야하는 데이터가 무엇인지
  // 외부에 노출 해도 되는게 무엇인지 생각해서 클래스를 잘 디자인 하는게 중요한다.

  // public : 기본적으로 다 되 있음! 따로 작성하지 않아도 됨
  // priavate : 외부에서 접근해서 변경하지 못하도록 private 하게 만든다.
  // protected : 외부에서는 접근 할 수 없지만 나중에 이 클래스를 부모로 자식클래스가 상속 받을때 그 자식 클래스 내에서 사용이 가능하다.
  class CoffeMaker {
    private static BEANS_GAMN_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeMaker {
      return new CoffeMaker(coffeeBeans);
    } // 이렇게 static을 붙여서 오브젝트를 만드는 함수가 제공한다면 누군가 생성자를 이용해서 생성하는것을 금지하기 위해서 쓴다.
    // rmfotj constructor에 private를 붙여서 항상 static 메소드를 이용할 수 있도록 권장한다.

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    } // 내부에서 함수를 만들어 커피콩을 채울 수 있게 만든다! 조금 더 안정성을 높여서 코드를 만든다.

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeMaker.BEANS_GAMN_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeMaker.BEANS_GAMN_PER_SHOT;
      return {
        shots: shots,
        hasMilk: false,
      };
    }
  }

  //   const maker = new CoffeMaker(37);
  const maker = CoffeMaker.makeMachine(32); // constructor private, static makeMashine 이유!
  maker.fillCoffeeBeans(37);
  //   maker.coffeeBeans = 3;  maker라는 오브젝트에 우리가 외부에 따로 coffeeBeans를 설정 할 수 있다.
  //   maker.coffeeBeans = 3;  invalid 위험함!
}
