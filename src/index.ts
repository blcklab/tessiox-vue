/** Vue 3 adapter: a thin lifecycle/reactivity bridge to the public Vanilla adapter. */
import { defineComponent, h, onMounted, onBeforeUnmount, ref, shallowRef, watch, type PropType } from 'vue';
import { createElementGrid, createElementTiles, type ElementGridDOM, type ElementGridDOMOptions } from '@blcklab/tessiox/dom';
import type { GridItem, ItemId, TableEvent, ThemeSelection } from '@blcklab/tessiox';

export type ElementGridVueOptions = Omit<ElementGridDOMOptions<GridItem>, 'items' | 'source' | 'onEvent'>;
type Mode = 'browser' | 'tiles';

function makeComponent(mode: Mode) {
  return defineComponent({
    name: mode === 'tiles' ? 'ElementTiles' : 'ElementGrid',
    props: {
      items: { type: Array as PropType<readonly GridItem[]>, default: () => [] },
      options: { type: Object as PropType<ElementGridVueOptions>, default: () => ({}) },
      selectedId: { type: String as PropType<ItemId | null>, default: undefined },
      theme: { type: [String, Object] as PropType<ThemeSelection>, default: undefined },
      colorMode: { type: String as PropType<'auto' | 'light' | 'dark'>, default: undefined },
    },
    emits: ['update:selectedId', 'select', 'preview', 'query', 'catalog', 'event'],
    setup(props, { slots, emit, expose }) {
      const target = shallowRef<HTMLElement | null>(null);
      const selected = ref<ItemId | null>(props.selectedId ?? null);
      const previewed = ref<ItemId | null>(null);
      let grid: ElementGridDOM<GridItem> | null = null;
      let alive = true;

      const notify = (event: TableEvent<GridItem>) => {
        emit('event', event);
        if (event.type === 'select') {
          selected.value = event.id;
          emit('update:selectedId', event.id);
          emit('select', event.item, event);
        } else if (event.type === 'preview') {
          previewed.value = event.id;
          emit('preview', event.item, event);
        } else if (event.type === 'query') emit('query', event.query);
        else if (event.type === 'catalog') emit('catalog', event.open);
      };
      const getOptions = (): ElementGridDOMOptions<GridItem> => {
        const options = props.options;
        return {
          ...options,
          items: props.items,
          ...(props.theme === undefined ? {} : { theme: props.theme }),
          ...(props.colorMode === undefined ? {} : { colorMode: props.colorMode }),
          ...(props.selectedId === undefined ? {} : { initialSelectedId: props.selectedId }),
          ...(slots.preview ? { browser: { ...options.browser, showFeaturedPreview: false } } : {}),
          ...(mode === 'tiles' ? {
            display: 'tiles' as const, showToolbar: false,
            browser: { ...options.browser, showFeaturedPreview: false, allowFullscreen: false, pagination: options.browser?.pagination ?? 'none' as const },
          } : {}),
          onEvent: notify,
        };
      };
      onMounted(() => {
        if (!target.value || !alive) return;
        const config = getOptions();
        grid = mode === 'tiles' ? createElementTiles(target.value, config) : createElementGrid(target.value, config);
        selected.value = grid.controller.getState().selectedId;
      });
      onBeforeUnmount(() => { alive = false; grid?.destroy(); grid = null; });
      watch(() => props.items, items => { grid?.setItems(items); }, { deep: true, flush: 'post' });
      watch(() => props.options, options => {
        // Keep the DOM adapter in tiles-only mode even if consumers replace
        // the entire options object reactively.
        grid?.updateOptions({
          ...options,
          ...(slots.preview ? { browser: { ...options.browser, showFeaturedPreview: false } } : {}),
          ...(mode === 'tiles' ? {
            display: 'tiles' as const,
            showToolbar: false,
            browser: { ...options.browser, showFeaturedPreview: false, allowFullscreen: false, pagination: options.browser?.pagination ?? 'none' as const },
          } : {}),
        });
      }, { deep: true, flush: 'post' });
      watch(() => props.theme, theme => { if (theme !== undefined) grid?.setTheme(theme); }, { deep: true });
      watch(() => props.colorMode, mode => { if (mode !== undefined) grid?.setColorMode(mode); });
      watch(() => props.selectedId, id => {
        if (id !== undefined && grid && grid.controller.getState().selectedId !== id) grid.controller.setSelectedId(id);
      });
      expose({
        get controller() { return grid?.controller ?? null; },
        get element() { return grid?.element ?? null; },
        refresh: () => grid?.refresh(),
      });
      return () => {
        const id = previewed.value ?? selected.value;
        const item = props.items.find((item: GridItem) => item.id === id) ?? null;
        const context = { item, selectedId: selected.value, previewId: previewed.value };
        return h('div', { class: mode === 'tiles' ? 'eg-vue-tiles' : 'eg-vue-collection' }, [
          ...(slots.before?.(context) ?? []),
          h('div', { ref: target, class: 'eg-vue-mount' }),
          ...(slots.preview?.(context) ?? []),
          ...(slots.after?.(context) ?? []),
        ]);
      };
    },
  });
}

/** Full collection browser; optional #preview slot remains owned by the Vue app. */
export const ElementGrid = makeComponent('browser');
/** Just tiles: app owns all surrounding typography, hero images and navigation. */
export const ElementTiles = makeComponent('tiles');

/** Single visual identity tile without enclosing browser UI. */
export const ElementTile = defineComponent({
  name: 'ElementTile',
  props: {
    item: { type: Object as PropType<GridItem>, required: true },
    options: { type: Object as PropType<ElementGridVueOptions>, default: () => ({}) },
    selectedId: { type: String as PropType<ItemId | null>, default: undefined },
  },
  emits: ['select', 'update:selectedId'],
  setup(props, { emit, slots }) {
    return () => h(ElementTiles, {
      items: [props.item],
      options: { ...props.options, layout: 'auto-grid', layoutOptions: { ...props.options.layoutOptions, columns: 1, rows: 1 } },
      selectedId: props.selectedId,
      'onUpdate:selectedId': (id: ItemId | null) => emit('update:selectedId', id),
      onSelect: (item: GridItem, event: TableEvent<GridItem>) => emit('select', item, event),
    }, slots);
  },
});

/** Optional brand-friendly component aliases; the underlying engine is @blcklab/tessiox. */
export { ElementGrid as Tessiox, ElementTiles as TessioxTiles, ElementTile as TessioxTile };

/** More explicit brand-oriented aliases, preserving existing Element* component names. */
export { ElementGrid as TessioxGrid, ElementTiles as TessioxTileGrid };
