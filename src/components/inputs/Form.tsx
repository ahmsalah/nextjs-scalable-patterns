import { Flex, type FlexProps } from "../box/Flex";

export type FormProps = FlexProps<"form">;

export function Form(props: FormProps) {
  return <Flex<"form"> component="form" noValidate flexbox={false} {...props} />;
}
