import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SignaturePad from 'signature_pad';
export interface SignatureCanvasProps extends SignaturePad.SignaturePadOptions {
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
    clearOnResize?: boolean;
}
export declare class SignatureCanvas extends Component<SignatureCanvasProps> {
    static propTypes: {
        velocityFilterWeight: PropTypes.Requireable<number>;
        minWidth: PropTypes.Requireable<number>;
        maxWidth: PropTypes.Requireable<number>;
        minDistance: PropTypes.Requireable<number>;
        dotSize: PropTypes.Requireable<number | ((...args: any[]) => any)>;
        penColor: PropTypes.Requireable<string>;
        throttle: PropTypes.Requireable<number>;
        onEnd: PropTypes.Requireable<(...args: any[]) => any>;
        onBegin: PropTypes.Requireable<(...args: any[]) => any>;
        canvasProps: PropTypes.Requireable<object>;
        clearOnResize: PropTypes.Requireable<boolean>;
    };
    static defaultProps: Pick<SignatureCanvasProps, 'clearOnResize'>;
    static refNullError: Error;
    private readonly staticThis;
    _sigPad: SignaturePad | null;
    _canvas: HTMLCanvasElement | null;
    private readonly setRef;
    _excludeOurProps: () => SignaturePad.SignaturePadOptions;
    componentDidMount: Component['componentDidMount'];
    componentWillUnmount: Component['componentWillUnmount'];
    componentDidUpdate: Component['componentDidUpdate'];
    getCanvas: () => HTMLCanvasElement;
    getTrimmedCanvas: () => HTMLCanvasElement;
    getSignaturePad: () => SignaturePad;
    _checkClearOnResize: () => void;
    _resizeCanvas: () => void;
    render: Component['render'];
    on: SignaturePad['on'];
    off: SignaturePad['off'];
    clear: SignaturePad['clear'];
    isEmpty: SignaturePad['isEmpty'];
    fromDataURL: SignaturePad['fromDataURL'];
    toDataURL: SignaturePad['toDataURL'];
    fromData: SignaturePad['fromData'];
    toData: SignaturePad['toData'];
}
export default SignatureCanvas;
//# sourceMappingURL=index.d.ts.map