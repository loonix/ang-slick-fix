import { AngularComponentOutput } from './../models/angularComponentOutput.interface';
import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
export declare class AngularUtilService {
    private compFactoryResolver;
    private appRef;
    private injector;
    constructor(compFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    createAngularComponent(component: any): AngularComponentOutput;
    createAngularComponentAppendToDom(component: any, targetElement?: HTMLElement | Element, clearTargetContent?: boolean): AngularComponentOutput;
}
