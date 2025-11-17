import React from 'react';
import ComponentDoc from './ComponentDoc';
import Badge from '@/components/Badge/Badge';

const basicBadgeCode = `import { Badge } from '@shadcn-mui/components';

function MyBadge() {
  return (
    <Badge>New</Badge>
  );
}`;

const variantsBadgeCode = `import { Badge } from '@shadcn-mui/components';

function BadgeVariants() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge variant="filled">Filled</Badge>
      <Badge variant="outlined">Outlined</Badge>
      <Badge variant="tonal">Tonal</Badge>
    </div>
  );
}`;

const colorsBadgeCode = `import { Badge } from '@shadcn-mui/components';

function BadgeColors() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Error</Badge>
      <Badge color="info">Info</Badge>
    </div>
  );
}`;

const sizesBadgeCode = `import { Badge } from '@shadcn-mui/components';

function BadgeSizes() {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge size="small" variant="tonal">Small</Badge>
      <Badge size="medium" variant="tonal">Medium</Badge>
    </div>
  );
}`;

const pulseBadgeCode = `import { Badge } from '@shadcn-mui/components';

function PulseBadge() {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge pulse color="error">
        Notifications
      </Badge>
      <Badge pulse variant="outlined" color="primary">
        Live
      </Badge>
    </div>
  );
}`;

const badgeProps = [
  {
    name: 'variant',
    type: '"filled" | "outlined" | "tonal"',
    description: 'The visual style variant of the badge',
    default: '"filled"',
  },
  {
    name: 'color',
    type: '"default" | "primary" | "secondary" | "success" | "warning" | "error" | "info"',
    description: 'The color of the badge',
    default: '"default"',
  },
  {
    name: 'size',
    type: '"small" | "medium"',
    description: 'The size of the badge',
    default: '"medium"',
  },
  {
    name: 'pulse',
    type: 'boolean',
    description: 'If true, the badge will pulse to draw attention',
    default: 'false',
  },
];

function BadgePreview() {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Badge>New</Badge>
      <Badge color="primary">Primary</Badge>
      <Badge color="success">Success</Badge>
    </div>
  );
}

function BadgeVariantsPreview() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge variant="filled">Filled</Badge>
      <Badge variant="outlined">Outlined</Badge>
      <Badge variant="tonal">Tonal</Badge>
    </div>
  );
}

function BadgeColorsPreview() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Error</Badge>
      <Badge color="info">Info</Badge>
    </div>
  );
}

export default function BadgeDoc() {
  const examples = [
    {
      title: 'Badge Variants',
      description: 'Different visual styles for badges',
      component: <BadgeVariantsPreview />,
      code: variantsBadgeCode,
    },
    {
      title: 'Badge Colors',
      description: 'Available color options',
      component: <BadgeColorsPreview />,
      code: colorsBadgeCode,
    },
    {
      title: 'Badge Sizes',
      description: 'Small and medium size options',
      component: <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Badge size="small" variant="tonal">Small</Badge>
        <Badge size="medium" variant="tonal">Medium</Badge>
      </div>,
      code: sizesBadgeCode,
    },
    {
      title: 'Pulse Animation',
      description: 'Badges can pulse to draw attention',
      component: <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Badge pulse color="error">Notifications</Badge>
      </div>,
      code: pulseBadgeCode,
    },
  ];

  return (
    <ComponentDoc
      title="Badge"
      description="Badges are small status descriptors for UI elements. Typically, they contain numbers or short text to draw attention."
      component={<BadgePreview />}
      code={basicBadgeCode}
      examples={examples}
      props={badgeProps}
    />
  );
}
