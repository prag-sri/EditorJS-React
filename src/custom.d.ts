// src/custom.d.ts

declare module '@editorjs/editorjs' {
  import { ToolConstructable, ToolSettings, API, OutputData } from '@editorjs/editorjs/types';

  export default class EditorJS {
    constructor(configuration: {
      holder: string;
      tools?: Record<string, ToolConstructable | ToolSettings>;
      onChange?: () => void;
    });

    public save(): Promise<OutputData>;
    public destroy(): void;
  }
}

declare module '@editorjs/header' {
  import { BlockToolConstructable, BlockToolData } from '@editorjs/editorjs';

  interface HeaderData extends BlockToolData {
    text: string;
    level: number;
  }

  const Header: BlockToolConstructable<HeaderData>;

  export default Header;
}

declare module '@editorjs/list' {
  import { BlockToolConstructable, BlockToolData } from '@editorjs/editorjs';

  interface ListData extends BlockToolData {
    items: Array<{ content: string }>;
    style: 'ordered' | 'unordered';
  }

  const List: BlockToolConstructable<ListData>;

  export default List;
}
