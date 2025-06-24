import{j as r}from"./jsx-runtime-Cf8x2fCZ.js";import{f as c,w as i,e as n}from"./index-FgW3rUnC.js";function o({message:t="List",onClick:s}){return r.jsx("p",{"data-testid":"ProductList",onClick:s,children:t})}o.__docgenInfo={description:"",methods:[],displayName:"ProductList",props:{message:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'List'",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const u={title:"Example/ProductList",component:o},e={name:"Default",args:{message:"Test",onClick:c()},play:async({canvasElement:t})=>{const a=i(t).getByTestId("ProductList");await n(a).toBeInTheDocument(),await n(a.textContent).toBe("Test")}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  args: {
    message: "Test",
    onClick: fn()
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByTestId('ProductList');
    await expect(element).toBeInTheDocument();
    await expect(element.textContent).toBe("Test");
  }
}`,...e.parameters?.docs?.source}}};const p=["ProductListStory"];export{e as ProductListStory,p as __namedExportsOrder,u as default};
