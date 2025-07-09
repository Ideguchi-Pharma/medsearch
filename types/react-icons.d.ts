// types/react-icons.d.ts

// ReactのSVGPropsを直接拡張し、classNameを含めることで、
// react-iconsの全てのアイコンコンポーネントがclassNameを受け取れるようにする
declare module "react" {
  interface SVGProps<TSVGElement extends SVGSVGElement> extends React.SVGProps<TSVGElement> {
    className?: string; // この行が確実にあること
  }

  export function useState(arg0: { id: string; name: string; }): [any, any] {
    throw new Error("Function not implemented.");
  }
}