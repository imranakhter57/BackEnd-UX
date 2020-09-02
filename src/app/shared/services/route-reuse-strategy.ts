import { RouteReuseStrategy } from '@angular/router';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
    compsToCache: string[] = ['TaskboardComponent', 'UserManagementComponent'];
    storedRouteHandles = new Map<string, DetachedRouteHandle>();

    // Decides if the route should be stored
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const name = route.component && (<any>route.component).name;
        return this.compsToCache.indexOf(name) > -1;
    }

    // Store the information for the route we're destructing
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.storedRouteHandles.set(route.routeConfig.path, handle);
    }

    // Return true if we have a stored route object for the next route
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return this.storedRouteHandles.has(route.routeConfig.path);
    }

    // If we returned true in shouldAttach(), now return the actual route data for restoration
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        return (route.routeConfig && route.routeConfig.path) ? this.storedRouteHandles.get(route.routeConfig.path) : null;
    }

    // Reuse the route if we're going to and from the same route
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        const name = future.component && (<any>future.component).name;
        return future.routeConfig === curr.routeConfig;
    }
}
