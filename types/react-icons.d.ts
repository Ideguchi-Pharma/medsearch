// types/react-icons.d.ts

// ReactのSVGPropsを直接拡張し、classNameを含めることで、
// react-iconsの全てのアイコンコンポーネントがclassNameを受け取れるようにする
declare module "react" {
  interface SVGProps<TSVGElement extends SVGSVGElement> extends React.SVGProps<TSVGElement> {
    className?: string; // この行が確実にあること
  }
  {/*}
  export function useState(arg0: { id: string; name: string; }): [T, any] {
    throw new Error("Function not implemented.");
  } */} {/* これを宣言すれば、"モジュール '"react"' にエクスポートされたメンバー 'useState' がありません。"というエラーが解消される。*/}
  {/* export function useEffect(arg0: () => void, arg1: never[]): void {
    throw new Error("Function not implemented.");
  } */} {/* これを宣言すれば、"モジュール '"react"' にエクスポートされたメンバー 'useEffect' がありません。"というエラーが解消される。*/}
}