---
title: TypeScript Support
category: Guides
---

# TypeScript Support

mui-cascade is written in TypeScript and provides full type definitions for all components.

## Type Safety

All component props are fully typed:

```tsx
import { Button } from 'mui-cascade';
import type { ButtonProps } from 'mui-cascade';

// Type-safe props
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Exported Types

```tsx
import type {
  ButtonProps,
  CardProps,
  InputProps,
  ModalProps,
} from 'mui-cascade';
```

## Custom Component Types

Create custom components with proper typing:

```tsx
import { Button } from 'mui-cascade';
import type { ButtonProps } from 'mui-cascade';

interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  customProp,
  ...buttonProps
}) => {
  return <Button {...buttonProps} />;
};
```

## Generic Types

Some components support generic types:

```tsx
import { Input } from 'mui-cascade';

// Type-safe form handling
const [value, setValue] = useState<string>('');

<Input<string>
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```
