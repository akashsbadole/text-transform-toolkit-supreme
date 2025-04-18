
import React from 'react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

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
