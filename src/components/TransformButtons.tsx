import React from 'react';
import { Button } from './ui/button';
import { 
  TextSelect, Bold, Italic, Strikethrough, Underline, Eraser,
  ListX, RemoveFormatting, FlipHorizontal, Binary, FileJson, Link2,
  Hash, RefreshCw, CircleDot, Superscript, Subscript, Type,
  TextCursor, Text, Slash, ArrowUpDown
} from 'lucide-react';

interface TransformButtonsProps {
  onTransform: (type: string) => void;
  onClear: () => void;
  onCopy: () => void;
  disabled?: boolean;
}

const TransformButtons: React.FC<TransformButtonsProps> = ({
  onTransform,
  onClear,
  onCopy,
  disabled = false
}) => {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {/* Text Cleanup Tools */}
      <Button
        variant="secondary"
        onClick={() => onTransform('remove-whitespace')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Eraser className="w-4 h-4" />
        Remove Whitespace
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('remove-duplicates')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <ListX className="w-4 h-4" />
        Remove Duplicates
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('remove-linebreaks')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <TextSelect className="w-4 h-4" />
        Remove Line Breaks
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('remove-formatting')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <RemoveFormatting className="w-4 h-4" />
        Remove Formatting
      </Button>

      {/* Text Formatting */}
      <Button
        variant="secondary"
        onClick={() => onTransform('bold')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Bold className="w-4 h-4" />
        Bold Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('italic')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Italic className="w-4 h-4" />
        Italic Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('strikethrough')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Strikethrough className="w-4 h-4" />
        Strikethrough
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('underline')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Underline className="w-4 h-4" />
        Underline
      </Button>

      <Button
        variant="secondary"
        onClick={() => onTransform('sentence')}
        className="bg-slate-700 hover:bg-slate-600 text-white"
        disabled={disabled}
      >
        Sentence case
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('lower')}
        className="bg-slate-700 hover:bg-slate-600 text-white"
        disabled={disabled}
      >
        lower case
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('upper')}
        className="bg-slate-700 hover:bg-slate-600 text-white"
        disabled={disabled}
      >
        UPPER CASE
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('title')}
        className="bg-slate-700 hover:bg-slate-600 text-white"
        disabled={disabled}
      >
        Title Case
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('alternating')}
        className="bg-slate-700 hover:bg-slate-600 text-white"
        disabled={disabled}
      >
        aLtErNaTiNg cAsE
      </Button>

      {/* Advanced Text Formatting */}
      <Button
        variant="secondary"
        onClick={() => onTransform('superscript')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Superscript className="w-4 h-4" />
        Superscript
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('subscript')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Subscript className="w-4 h-4" />
        Subscript
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('wide')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <TextCursor className="w-4 h-4" />
        Wide Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('small')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Text className="w-4 h-4" />
        Small Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('stacked')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <ArrowUpDown className="w-4 h-4" />
        Stacked Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('slash')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Slash className="w-4 h-4" />
        Slash Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('zalgo')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Type className="w-4 h-4" />
        Zalgo Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('upsidedown')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <FlipHorizontal className="w-4 h-4" />
        Upside Down
      </Button>

      {/* Advanced Text Transformations */}
      <Button
        variant="secondary"
        onClick={() => onTransform('reverse')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <RefreshCw className="w-4 h-4" />
        Reverse Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('mirror')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <FlipHorizontal className="w-4 h-4" />
        Mirror Text
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('unicode')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Hash className="w-4 h-4" />
        Unicode
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('bubble')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <CircleDot className="w-4 h-4" />
        Bubble Text
      </Button>

      {/* Technical Conversions */}
      <Button
        variant="secondary"
        onClick={() => onTransform('base64-encode')}
        className="bg-slate-700 hover:bg-slate-600 text-white"
        disabled={disabled}
      >
        Base64 Encode
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('base64-decode')}
        className="bg-slate-700 hover:bg-slate-600 text-white"
        disabled={disabled}
      >
        Base64 Decode
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('url-encode')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Link2 className="w-4 h-4" />
        URL Encode
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('url-decode')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Link2 className="w-4 h-4" />
        URL Decode
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('json-stringify')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <FileJson className="w-4 h-4" />
        JSON Stringify
      </Button>
      <Button
        variant="secondary"
        onClick={() => onTransform('binary')}
        className="text-white bg-slate-700 hover:bg-slate-600 gap-2"
        disabled={disabled}
      >
        <Binary className="w-4 h-4" />
        Binary Code
      </Button>

      {/* Utility Buttons */}
      <div className="flex gap-2 ml-auto">
        <Button
          onClick={onCopy}
          disabled={disabled}
          variant="outline"
          className="bg-slate-700 hover:bg-slate-600 text-white"
        >
          Copy to Clipboard
        </Button>
        <Button
          variant="destructive"
          onClick={onClear}
          disabled={disabled}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default TransformButtons;
