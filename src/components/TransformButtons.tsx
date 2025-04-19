
import React from 'react';
import { Button } from './ui/button';
import { 
  TextSelect, Bold, Italic, Strikethrough, Underline, Eraser,
  ListX, RemoveFormatting, FlipHorizontal, Binary, FileJson, Link2,
  Hash, RefreshCw, CircleDot
} from 'lucide-react';

interface TransformButtonsProps {
  onTransform: (type: string) => void;
  onClear: () => void;
  onCopy: () => void;
}

const TransformButtons: React.FC<TransformButtonsProps> = ({
  onTransform,
  onClear,
  onCopy,
}) => {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {/* Text Cleanup Tools */}
      <Button
        variant="secondary"
        onClick={() => onTransform('remove-whitespace')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <Eraser className="w-4 h-4" />
        Remove Whitespace
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('remove-duplicates')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <ListX className="w-4 h-4" />
        Remove Duplicates
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('remove-linebreaks')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <TextSelect className="w-4 h-4" />
        Remove Line Breaks
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('remove-formatting')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <RemoveFormatting className="w-4 h-4" />
        Remove Formatting
      </Button>

      {/* Text Formatting */}
      <Button
        variant="secondary"
        onClick={() => onTransform('bold')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <Bold className="w-4 h-4" />
        Bold Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('italic')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <Italic className="w-4 h-4" />
        Italic Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('strikethrough')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <Strikethrough className="w-4 h-4" />
        Strikethrough
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('underline')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <Underline className="w-4 h-4" />
        Underline
      </Button>

      <Button
        variant="secondary"
        onClick={() => onTransform('sentence')}
        className="bg-slate-700 hover:bg-slate-600"
      >
        Sentence case
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('lower')}
        className="bg-slate-700 hover:bg-slate-600"
      >
        lower case
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('upper')}
        className="bg-slate-700 hover:bg-slate-600"
      >
        UPPER CASE
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('title')}
        className="bg-slate-700 hover:bg-slate-600"
      >
        Title Case
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('alternating')}
        className="bg-slate-700 hover:bg-slate-600"
      >
        aLtErNaTiNg cAsE
      </Button>

      {/* Advanced Text Transformations */}
      <Button
        variant="secondary"
        onClick={() => onTransform('reverse')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Reverse Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('mirror')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <FlipHorizontal className="w-4 h-4" />
        Mirror Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('unicode')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <Hash className="w-4 h-4" />
        Unicode
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('bubble')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <CircleDot className="w-4 h-4" />
        Bubble Text
      </Button>

      {/* Technical Conversions */}
      <Button
        variant="secondary"
        onClick={() => onTransform('base64-encode')}
        className="bg-slate-700 hover:bg-slate-600"
      >
        Base64 Encode
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('base64-decode')}
        className="bg-slate-700 hover:bg-slate-600"
      >
        Base64 Decode
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('url-encode')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <Link2 className="w-4 h-4" />
        URL Encode
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('url-decode')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <Link2 className="w-4 h-4" />
        URL Decode
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('json-stringify')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <FileJson className="w-4 h-4" />
        JSON Stringify
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('binary')}
        className="bg-slate-700 hover:bg-slate-600 gap-2"
      >
        <Binary className="w-4 h-4" />
        Binary Code
      </Button>

      {/* Utility Buttons */}
      <Button
        variant="secondary"
        onClick={onCopy}
        className="bg-slate-700 hover:bg-slate-600"
      >
        Copy to Clipboard
      </Button>
      <Button
        variant="destructive"
        onClick={onClear}
      >
        Clear
      </Button>
    </div>
  );
};

export default TransformButtons;
